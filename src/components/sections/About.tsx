const bio = [
  "I'm a self-taught full-stack developer in Conway, South Carolina. I design, build, and ship complete products, not just features.",
  'Two production sites are live and serving real users today, including a 3,000+ listing directory with payments, search, and SEO built end to end.',
  "I'm comfortable across the stack: TypeScript and React on the front, Node, PostgreSQL, and Prisma on the back, deployed and maintained in production.",
  "I'm also the on-site IT person at my day job: Wi-Fi, DNS, the print server, and first-line support for staff.",
  "I'm finishing a B.S. in Computer Science at WGU and adding Java to a mostly TypeScript toolkit.",
];

export default function About() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: '66ch' }}>
      {bio.map(line => (
        <p key={line} style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--platinum)' }}>
          {line}
        </p>
      ))}
    </div>
  );
}
