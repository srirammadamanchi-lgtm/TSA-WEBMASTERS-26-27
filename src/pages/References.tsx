// TSA-required reference page. All four items below must be present at submission:
// sources, permissions, Student Copyright Checklist PDF, Resources and AI Reflection PDF.
import { SITE_NAME } from '../site'

// Every framework/library in package.json must be listed here (TSA rule G).
const technologies = [
  { name: 'React', url: 'https://react.dev' },
  { name: 'React Router', url: 'https://reactrouter.com' },
  { name: 'Vite', url: 'https://vite.dev' },
  { name: 'Tailwind CSS', url: 'https://tailwindcss.com' },
  { name: 'TypeScript', url: 'https://www.typescriptlang.org' },
  { name: 'Motion (animation library)', url: 'https://motion.dev' },
]

// Third-party assets and components (licenses matter). Add a row for anything copied into the repo.
const credits = [
  {
    name: 'React Bits (ClickSpark, TiltedCard, CountUp, ShinyText, SpotlightCard, StarBorder, Folder)',
    url: 'https://reactbits.dev',
    license: 'MIT + Commons Clause, copied into src/components/reactbits/ with its license file',
  },
  {
    name: 'DiceBear Voxel Bot (AI model art)',
    url: 'https://www.dicebear.com/styles/voxel-bot/',
    license: 'CC0 1.0',
  },
  {
    name: 'DiceBear Notionists (player avatars)',
    url: 'https://www.dicebear.com/styles/notionists/',
    license: 'CC0 1.0',
  },
  {
    name: 'Lilita One font (via Fontsource)',
    url: 'https://fontsource.org/fonts/lilita-one',
    license: 'SIL Open Font License 1.1',
  },
]

export function References() {
  return (
    <>
      <title>{`References · ${SITE_NAME}`}</title>
      <h1 className="text-3xl font-extrabold">References</h1>

      <div className="prose-lesson">
        <h2>Sources</h2>
        {/* TODO(everyone): add every source you use, in ONE citation style (team picks: MLA/APA/Chicago/IEEE). */}
        <ul className="list-disc pl-6">
          <li>No sources added yet.</li>
        </ul>

        <h2>Frameworks and technologies</h2>
        <ul className="list-disc pl-6">
          {technologies.map((t) => (
            <li key={t.name}>
              <a href={t.url} className="text-brand underline">
                {t.name}
              </a>
            </li>
          ))}
        </ul>

        <h2>Art, fonts and components</h2>
        <ul className="list-disc pl-6">
          {credits.map((c) => (
            <li key={c.name}>
              <a href={c.url} className="text-brand underline">
                {c.name}
              </a>{' '}
              - {c.license}
            </li>
          ))}
        </ul>
        <p>
          The start page layout is inspired by the Brawl Stars profile screen (Supercell). No game assets are used.
        </p>

        <h2>Copyright permissions</h2>
        {/* TODO: list written permission for any copyrighted text, image or sound, or keep this statement true. */}
        <p>All graphics and text on this site are original work by the team unless cited above.</p>

        <h2>Required documents</h2>
        {/* TODO: put the two signed/completed PDFs in public/docs/ with exactly these file names. */}
        <ul className="list-disc pl-6">
          <li>
            <a href="/docs/student-copyright-checklist.pdf" className="text-brand underline">
              Student Copyright Checklist (PDF)
            </a>
          </li>
          <li>
            <a href="/docs/resources-and-ai-reflection.pdf" className="text-brand underline">
              Resources and AI Reflection (PDF)
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}
