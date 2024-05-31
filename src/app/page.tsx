import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-center text-center text-sm lg:flex flex-col">
        <p className="text-start text-5xl font-bold">
          Flex Up With FlexTime!
        </p>
        <Link className="btn btn-info btn-outline w-32 px-4 py-2 mt-5" href="/fitnessplans">
          Fitness Plan
        </Link>
      </div>
    </main>
  );
}
