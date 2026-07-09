"use client";

import { Globe } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function AboutPage() {
    return (
        <div className="bg-gray-50 px-6 py-16">
            <div className="max-w-5xl w-full mx-auto bg-white rounded-2xl shadow-md p-10 md:p-12">

                <h1 className="text-4xl font-semibold text-gray-800 mb-8 text-center">
                    About Me
                </h1>

                <div className="space-y-6 text-gray-600 leading-relaxed text-base md:text-lg">

                    <p>
                        This website has been created for educational purposes and serves as a platform to showcase my skills,
                        projects, and continuous growth in the field of technology. It reflects my learning journey and will
                        be used in the future as part of my professional portfolio.
                    </p>

                    <p>
                        Hi, I’m <span className="font-semibold text-gray-800">Ramitha Manilka</span>, an undergraduate student pursuing a degree in Information Technology with a specialization in Artificial Intelligence.
                        I am passionate about AI and software engineering, and I enjoy building practical solutions that solve real-world problems.
                    </p>

                    <p>
                        I am constantly exploring new technologies and improving my skills to become a better developer.
                    </p>

                </div>

                {/* Links */}
                <div className="mt-10 pt-6 border-t flex justify-center gap-6">

                    <a
                        href="https://ramithax.github.io/Portfolio/"
                        target="_blank"
                        className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors"
                    >
                        <Globe size={20} />
                        Portfolio
                    </a>

                    <a
                        href="https://github.com/ramithax"
                        target="_blank"
                        className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors"
                    >
                        <FaGithub size={20} />
                        GitHub
                    </a>

                </div>

            </div>
        </div>
    );
}