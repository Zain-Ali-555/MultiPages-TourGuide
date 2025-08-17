import type { TourStep } from '@/components/tour/tour-provider';

export const tourSteps: TourStep[] = [
  {
    id: 'step-1-welcome',
    target: '#hero',
    title: '👋 Welcome to AI Jobs!',
    placement: 'bottom',
    content: 'A brief welcome to the AI Jobs Dashboard.',
  },
  {
    id: 'step-2-navbar',
    target: '#navbar',
    title: '🧭 Navigation Bar',
    placement: 'bottom',
    content: 'The main navigation with links to key sections.',
  },
  {
    id: 'step-3-profile',
    target: '#profile-menu',
    title: '👤 Profile Menu',
    placement: 'bottom',
    content: 'Access your account settings, billing, and logout.',
  },
  {
    id: 'step-4-progress',
    target: '#progress-tracker',
    title: '📊 Progress Tracker',
    placement: 'left',
    content: 'Track your profile completion and applications sent.',
  },
  {
    id: 'step-5-features',
    target: '#feature-cards',
    title: '✨ Your AI Toolkit',
    placement: 'bottom',
    content: 'An overview of the AI-powered tools available to you.',
  },
  {
    id: 'step-6-resume-card',
    target: '#resume-builder-card',
    title: '📄 AI Resume Builder',
    placement: 'bottom',
    content: 'Create a professional resume with help from AI.',
  },
  {
    id: 'step-7-analytics',
    target: '#analytics',
    title: '📈 Analytics Overview',
    placement: 'top',
    content: 'Insights into your job application performance.',
  },
  {
    id: 'step-8-bar-chart',
    target: '#bar-chart-card',
    title: '📥 Applications Chart',
    placement: 'top',
    content: 'Visualize your monthly job application activity.',
  },
  {
    id: 'step-9-settings',
    target: '#settings',
    title: '⚙️ Settings',
    placement: 'top',
    content: 'Manage your account information and preferences.',
  },
  {
    id: 'step-10-finish',
    target: '',
    title: '🎉 You\'re All Set!',
    placement: 'center',
    content: 'You have completed the tour! Feel free to explore.',
  },
];
