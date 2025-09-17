"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-9xl font-extrabold text-red-500 mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-2">Oops! Page not found</h2>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        The page you are looking for might have been removed or does not exist.
      </p>
      <div className="flex gap-4">
        <Button
          onClick={() => router.back()}
          size="lg"
          variant="secondary"
          className="!rounded-[8px]">
          Go Back
        </Button>
        <Link href="/">
          <Button size="lg" className="!rounded-[8px]">
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
