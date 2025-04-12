// components/InstallExtensionCTA.tsx
import { Chrome } from "lucide-react"; // or your own Chrome icon
import Link from "next/link";
import MaxWidthWrapper from "../MaxWidthWrapper";

export default function InstallExtensionCTA() {
  return (
    <section className="bg-primary text-white py-16">
      <MaxWidthWrapper className="flex flex-col items-center text-center gap-6">
        <h2 className="text-3xl font-bold tracking-tight">
          Ready to level up your meetings?
        </h2>
        <p className="max-w-xl text-lg text-white/90">
          Add EngageSync to Chrome and start getting real-time feedback,
          insights, and better conversations.
        </p>

        <Link
          href="https://chrome.google.com/webstore/detail/your-extension-id" // replace with your actual link
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-primary font-semibold py-3 px-6 rounded-xl hover:bg-gray-100 transition"
        >
          <Chrome className="h-5 w-5" />
          Install Extension
        </Link>
        <div className="mt-10 w-full max-w-2xl aspect-video rounded-xl overflow-hidden shadow-lg">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
            title="EngageSync Demo Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
