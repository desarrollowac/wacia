<?php

namespace App\Http\Controllers;

use App\Models\ContentProject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ContentController extends Controller
{
    /**
     * Get all content projects for authenticated user.
     */
    public function index(Request $request)
    {
        $projects = $request->user()->contentProjects()
            ->orderBy('updated_at', 'desc')
            ->paginate(10);

        return response()->json($projects);
    }

    /**
     * Store a new content project.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'content_type' => 'required|in:blog_post,article,social_media,email,landing_page',
            'target_keywords' => 'nullable|array',
            'target_audience' => 'nullable|string',
            'content_length' => 'nullable|in:short,medium,long',
            'tone' => 'nullable|in:formal,informal,friendly,professional,persuasive',
        ]);

        $project = $request->user()->contentProjects()->create([
            'title' => $request->title,
            'description' => $request->description,
            'content_type' => $request->content_type,
            'target_keywords' => $request->target_keywords ?? [],
            'target_audience' => $request->target_audience,
            'content_length' => $request->content_length ?? 'medium',
            'tone' => $request->tone ?? 'professional',
            'status' => 'draft',
            'ai_generated' => false,
        ]);

        return response()->json([
            'message' => 'Proyecto creado exitosamente',
            'project' => $project,
        ], 201);
    }

    /**
     * Show a specific content project.
     */
    public function show(Request $request, ContentProject $project)
    {
        // Ensure user owns the project
        if ($project->user_id !== $request->user()->id) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        return response()->json($project);
    }

    /**
     * Update a content project.
     */
    public function update(Request $request, ContentProject $project)
    {
        // Ensure user owns the project
        if ($project->user_id !== $request->user()->id) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'content_type' => 'sometimes|in:blog_post,article,social_media,email,landing_page',
            'target_keywords' => 'sometimes|array',
            'target_audience' => 'sometimes|string',
            'content_length' => 'sometimes|in:short,medium,long',
            'tone' => 'sometimes|in:formal,informal,friendly,professional,persuasive',
            'draft_content' => 'sometimes|string',
            'final_content' => 'sometimes|string',
            'status' => 'sometimes|in:draft,in_progress,completed,published',
        ]);

        $project->update($request->only([
            'title', 'description', 'content_type', 'target_keywords',
            'target_audience', 'content_length', 'tone', 'draft_content',
            'final_content', 'status'
        ]));

        return response()->json([
            'message' => 'Proyecto actualizado exitosamente',
            'project' => $project,
        ]);
    }

    /**
     * Delete a content project.
     */
    public function destroy(Request $request, ContentProject $project)
    {
        // Ensure user owns the project
        if ($project->user_id !== $request->user()->id) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $project->delete();

        return response()->json([
            'message' => 'Proyecto eliminado exitosamente',
        ]);
    }

    /**
     * Generate AI content for a project.
     */
    public function generateAIContent(Request $request, ContentProject $project)
    {
        // Ensure user owns the project
        if ($project->user_id !== $request->user()->id) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        // Check if user has credits
        if ($request->user()->getRemainingCredits() < 1) {
            return response()->json([
                'message' => 'No tienes suficientes créditos para generar contenido con IA',
            ], 402);
        }

        try {
            // Simulate AI content generation (replace with actual OpenAI integration)
            $aiContent = $this->simulateAIGeneration($project);

            // Update project with AI-generated content
            $project->update([
                'draft_content' => $aiContent,
                'ai_generated' => true,
                'status' => 'in_progress',
            ]);

            // Deduct credit
            $request->user()->decrement('credits', 1);

            return response()->json([
                'message' => 'Contenido generado exitosamente con IA',
                'project' => $project->fresh(),
                'remaining_credits' => $request->user()->fresh()->getRemainingCredits(),
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al generar contenido con IA: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Simulate AI content generation (replace with actual OpenAI API call).
     */
    private function simulateAIGeneration(ContentProject $project)
    {
        $templates = [
            'blog_post' => "# {$project->title}\n\n## Introducción\n\nEste es un artículo sobre {$project->description}. En este contenido exploraremos los aspectos más importantes del tema.\n\n## Desarrollo\n\nPuntos clave a desarrollar:\n- Punto 1\n- Punto 2\n- Punto 3\n\n## Conclusión\n\nEn resumen, este tema es fundamental para...",
            'article' => "# {$project->title}\n\nArtículo especializado sobre {$project->description}.\n\n## Contenido principal\n\nDesarrollo del tema con enfoque profesional...",
            'social_media' => "🚀 {$project->title}\n\n{$project->description}\n\n#SEO #Marketing #Contenido",
            'email' => "Asunto: {$project->title}\n\nHola,\n\nEspero que te encuentres bien. Te escribo para compartir información sobre {$project->description}.\n\nSaludos cordiales",
            'landing_page' => "# {$project->title}\n\n## Headline Principal\n\n{$project->description}\n\n### Beneficios:\n- Beneficio 1\n- Beneficio 2\n- Beneficio 3\n\n[CTA Button]"
        ];

        return $templates[$project->content_type] ?? $templates['blog_post'];
    }
}
