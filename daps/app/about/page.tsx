"use client";

import { PageMenuShell } from "@/components/ui/page-menu-shell";
import { UserAvatars } from "@/components/ui/user-avatars";

export default function AboutPage() {
  const users = [
    {
      id: 1,
      name: "Bandari Vikram",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80",
    },
    {
      id: 2,
      name: "BhagyaShree",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80",
    },
    {
      id: 3,
      name: "Poorvi",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80",
    },
    {
      id: 4,
      name: "Kavita",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 py-20 text-center text-foreground">
      <PageMenuShell />
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">About</h1>
      <p className="max-w-2xl text-foreground/75">Core team members</p>
      <UserAvatars users={users} size={72} overlap={62} focusScale={1.22} />
    </main>
  );
}
