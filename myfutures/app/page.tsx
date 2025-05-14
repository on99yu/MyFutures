import Link from "next/link";

export default function Page() {
  return (
    <div
      className="flex flex-col w-full p-30
                        gap-10 items-center justify-between"
    >
      <Link
        href="/lotcalculator"
        className="flex h-10 items-center rounded-lg 
                        bg-blue-600 px-4 text-sm font-medium text-white
                        transition-colors
                        hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        랏수 계산기
      </Link>
      <Link
        href="/lotcalculator"
        className="flex h-10 items-center rounded-lg 
                    bg-green-600 px-4 text-sm font-medium text-white
                    transition-colors
                    hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        Trading Records
      </Link>
    </div>
  );
}
