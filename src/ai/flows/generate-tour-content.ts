// src/ai/flows/generate-tour-content.ts
'use server';

/**
 * @fileOverview An AI agent that generates tour content for the AI Jobs dashboard.
 *
 * - generateTourContent - A function that generates tour content.
 * - GenerateTourContentInput - The input type for the generateTourContent function.
 * - GenerateTourContentOutput - The return type for the generateTourContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTourContentInputSchema = z.object({
  moduleName: z.string().describe('The name of the dashboard module.'),
  featureDescription: z.string().describe('A description of the dashboard module feature.'),
});
export type GenerateTourContentInput = z.infer<typeof GenerateTourContentInputSchema>;

const GenerateTourContentOutputSchema = z.object({
  tourContent: z.string().describe('The generated tour content for the dashboard module.'),
});
export type GenerateTourContentOutput = z.infer<typeof GenerateTourContentOutputSchema>;

export async function generateTourContent(input: GenerateTourContentInput): Promise<GenerateTourContentOutput> {
  return generateTourContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTourContentPrompt',
  input: {schema: GenerateTourContentInputSchema},
  output: {schema: GenerateTourContentOutputSchema},
  prompt: `You are an AI assistant that generates friendly, professional, and clear instructions for each step of a tour guide in a job application dashboard, with emojis for emphasis.

  Based on the dashboard module name and feature description, generate tour content that explains the feature to a new user.

  Dashboard Module: {{moduleName}}
  Feature Description: {{featureDescription}}

  Tour Content:`,
});

const generateTourContentFlow = ai.defineFlow(
  {
    name: 'generateTourContentFlow',
    inputSchema: GenerateTourContentInputSchema,
    outputSchema: GenerateTourContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
