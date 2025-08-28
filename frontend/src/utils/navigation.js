import {
  HomeIcon,
  DocumentTextIcon,
  UserGroupIcon,
  CreditCardIcon,
  LinkIcon,
} from '@heroicons/react/24/outline'

export const navigation = [
  { name: 'Inicio', href: '/dashboard', icon: HomeIcon, children: [{ name: 'Perfil', href: '/profile' }] },
  {
    name: 'Backlinks',
    icon: LinkIcon,
    children: [
      { name: 'Ver Medios', href: '/backlinks' },
      { name: 'Mis Proyectos', href: '/backlinks/proyectos' },
    ],
  },
  {
    name: 'Texto',
    icon: DocumentTextIcon,
    children: [
      { name: 'Textos con IA', href: '/texto-ia' },
      { name: 'Textos con Humanos', href: '/humanos' },
    ],
  },
  {
    name: 'Influencers',
    icon: UserGroupIcon,
    children: [
      { name: 'Ver Influencers', href: '/influencers' },
      { name: 'Mis Campañas', href: '/influencers/campanas' },
    ],
  },
  {
    name: 'Forma de pago',
    icon: CreditCardIcon,
    children: [
      { name: 'Suscripción', href: '/billing' },
      { name: 'Historial', href: '/billing/history' },
    ],
  },
]
