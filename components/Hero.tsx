'use client';

import ThreeModel from './ThreeModel';
import { Button } from './ui/button';

export default function Hero() {
  return (
    <section className="grid md:grid-cols-2 gap-10 p-6 items-center">
      <div>
        <h1 className="text-4xl font-bold mb-4">Hi, I&apos;m Bhanu Sharma</h1>
        <p className="text-gray-300 mb-6">
          Full-stack developer building modern web & mobile apps using React, Next.js, Node.js & 3D experiences.
        </p>
        <Button variant="outline">Download Resume</Button>
      </div>
      <ThreeModel />
    </section>
  );
}
