import SidebarComponent from "@/components/SidebarComponent";
import Link from "next/link";

export default function HomePage() {
  const paths = ['login', 'post', 'register'] as const
  return (
    <div className="home-container">
      <SidebarComponent />
      <div className="main-container">
        <section className="flex flex-col gap-12 items-center justify-center h-screen">
          {/* Added for testing paths */}
          {paths.map((p) => (<Link href={p} className="capitalize" passHref>{p}</Link>))}
        </section>
      </div>
    </div>
  );
}
