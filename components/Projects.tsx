import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { IProjects } from "../typings";
import Github from "../assets/github.webp";
import Web from "../assets/www.png";

interface IProjectsProps {
  projects: IProjects[];
}

export const Projects: NextPage<IProjectsProps> = ({ projects }) => {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [filteredProjects, setFilteredProjects] = useState<IProjects[]>(projects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState<string[]>([]);

  const openImageModal = (images: string[], index: number) => {
    setCurrentImages(images);
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % currentImages.length);

  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);

  useEffect(() => {
    if (activeCategory === "ALL") {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project =>
        project.categories.some(category => category.toLowerCase() === activeCategory.toLowerCase())
      );
      setFilteredProjects(filtered);
    }
  }, [activeCategory, projects]);

  return (
    <>
      <h1 className="projects_heading">Personal Projects</h1>
      <div className="projects_filter">
        <div className="projects_filter_box">
          {["ALL", "Frontend Developer", "UI/UX Designer", "Graphic Designer"].map((category) => (
            <div
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`projects_filter_box_item ${activeCategory === category ? "activeTag" : ""}`}
            >
              {category}
            </div>
          ))}
        </div>

        <div className="projects_filter_cardsBox">
          {filteredProjects.map((project) => (
            <div key={project.id} className="projects_filter_cardsBox_card">
              <div className="projects_filter_cardsBox_card_img_container">
                <img
                  src={project.image[0]}
                  alt=""
                  className="projects_filter_cardsBox_card_img"
                  onClick={() => openImageModal(project.image, 0)}
                />
              </div>
              <p className="projects_filter_cardsBox_card_title">{project.title}</p>
              <p className="projects_filter_cardsBox_card_description">{project.description}</p>
              <div className="projects_filter_cardsBox_card_techstack">
                {project.techStack.map((tech, index) => (
                  <span key={index} className="techstack_item">{tech.text}</span>
                ))}
              </div>
              <div className="projects_filter_cardsBox_card_links">
                {project.demoLink && (
                  <img
                    src={Web.src}
                    alt="Demo"
                    onClick={() => window.open(project.demoLink, "_blank")}
                    className="link_icon"
                  />
                )}
              </div>
            </div>          
          ))}
        </div>
      </div>
      {/* Modal for Image Carousel */}
      {isModalOpen && (
        <div className="modal_overlay" onClick={closeModal}>
          <div className="modal_content" onClick={(e) => e.stopPropagation()}>
            <img src={currentImages[currentImageIndex]} alt="Project" className="modal_image" />
            <button className="modal_prev" onClick={prevImage}>❮</button>
            <button className="modal_next" onClick={nextImage}>❯</button>
            <button className="modal_close" onClick={closeModal}>✕</button>
          </div>
        </div>
      )}

      <style jsx>{`
        .modal_overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal_content {
          position: relative;
          max-width: 80%;
          max-height: 80%;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        .modal_image {
          height: 100vh;
          width: auto;
          max-height: 100%;
          object-fit: contain;
          display: block;
        }

        .modal_prev, 
        .modal_next {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          padding: 10px;
          cursor: pointer;
          z-index: 10;
        }

        .modal_prev {
          left: 10px;
        }

        .modal_next {
          right: 10px;
        }

        .modal_close {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          padding: 5px;
          cursor: pointer;
          z-index: 10;
        }

      `}</style>
    </>
  );
};
