import ProjectForm from "@/components/admin/ProjectForm";

export const metadata = { title: "New project — Admin" };

export default function NewProjectPage() {
  const blank = {
    slug: "",
    title: "",
    year: String(new Date().getFullYear()),
    status: "",
    tagline: "",
    description: "",
    order: "0",
    liveUrl: "",
    githubUrl: "",
    visual: "architecture",
    stack: "",
    highlights: "",
    images: "",
    details: "{\n  \n}",
    featured: true,
    published: true,
  };

  return (
    <>
      <h1 className="mb-8 text-2xl font-extrabold text-ink">New project</h1>
      <ProjectForm project={blank} />
    </>
  );
}
