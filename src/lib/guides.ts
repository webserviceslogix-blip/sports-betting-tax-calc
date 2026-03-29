import fs from 'fs';
import path from 'path';

export interface GuideFAQ {
  question: string;
  answer: string;
}

export interface GuideSection {
  heading: string;
  answerBlock: string; // 40-60 word AI citation block
  body: string; // Full section content
}

export interface Guide {
  slug: string;
  title: string;
  metaDescription: string;
  publishedDate: string;
  updatedDate: string;
  author: string;
  reviewedBy: string;
  readTime: string;
  intro: string; // First paragraph — the hook
  sections: GuideSection[];
  faq: GuideFAQ[];
  relatedGuides: { title: string; slug: string }[];
  relatedTools: { title: string; href: string }[];
}

const GUIDES_DIR = path.join(process.cwd(), 'src', 'content', 'guides');

export function getGuide(slug: string): Guide | null {
  const filePath = path.join(GUIDES_DIR, `${slug}.json`);
  try {
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as Guide;
  } catch {
    return null;
  }
}

export function getAllGuideSlugs(): string[] {
  try {
    if (!fs.existsSync(GUIDES_DIR)) return [];
    return fs
      .readdirSync(GUIDES_DIR)
      .filter((f) => f.endsWith('.json'))
      .map((f) => f.replace('.json', ''));
  } catch {
    return [];
  }
}

export function getAllGuides(): Guide[] {
  return getAllGuideSlugs()
    .map((slug) => getGuide(slug))
    .filter((g): g is Guide => g !== null);
}
