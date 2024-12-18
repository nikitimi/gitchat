import SidebarComponent from "@/components/SidebarComponent";
import PostPage from "@/components/PostPage";

export default function HomePage() {
  return (
    <div className="home-container">
      <SidebarComponent />
      <div className="main-container">
        <PostPage />
      </div>
    </div>
  );
}
