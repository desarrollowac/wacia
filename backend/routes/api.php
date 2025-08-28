<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ContentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::put('/user/profile', [AuthController::class, 'updateProfile']);
    
    // Content routes
    Route::apiResource('content-projects', ContentController::class);
    Route::post('/content-projects/{project}/generate-ai', [ContentController::class, 'generateAIContent']);
    
    // Dashboard stats
    Route::get('/dashboard/stats', function (Request $request) {
        $user = $request->user();
        
        return response()->json([
            'total_projects' => $user->contentProjects()->count(),
            'completed_projects' => $user->contentProjects()->where('status', 'completed')->count(),
            'remaining_credits' => $user->getRemainingCredits(),
            'subscription_status' => $user->hasActiveSubscription() ? 'active' : 'inactive',
        ]);
    });
});
