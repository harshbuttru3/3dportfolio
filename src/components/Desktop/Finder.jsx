import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Icons } from "./BasicIcons";
import "./Finder.css";

const PLACES = [
  { id: "projects", name: "Projects", icon: Icons.folder },
  { id: "documents", name: "Documents", icon: Icons.folder },
  { id: "music", name: "Music", icon: Icons.music },
];

const DOCUMENT_FILES = [
  { id: "resume", name: "Resume.pdf", icon: Icons.pdf, iconType: 'pdf', type: 'pdf' },
  { id: "linuxcommands", name: "Linux Commands.pdf", icon: Icons.pdf, iconType: 'pdf', type: 'pdf' },
  { id: "jsnotes", name: "JavaScript Notes", icon: Icons.document, iconType: 'document', type: 'document' },
  { id: "readme", name: "README.md", icon: Icons.document, iconType: 'text', type: 'text' },
  { id: "license", name: "LICENSE", icon: Icons.document, iconType: 'text', type: 'text' },
];

const PROJECT_FILES = [
  { id: "github", name: "GitHub", icon: Icons.github, iconType: 'github', type: 'app' },
  { id: "spotify", name: "Spotify", icon: Icons.spotify, iconType: 'spotify', type: 'app' },
  { id: "jsnotes", name: "JavaScript Notes", icon: Icons.document, iconType: 'document', type: 'document' },
  { id: "browser", name: "Portfolio Website", icon: Icons.browser, iconType: 'browser', type: 'app' },
  { id: "booking", name: "Booking-App", icon: Icons.folder, iconType: 'folder', type: 'folder' },
  { id: "cisco", name: "cisco", icon: Icons.folder, iconType: 'folder', type: 'folder' },
  { id: "linux", name: "100_Linux_Commands", icon: Icons.document, iconType: 'document', type: 'document' },
];

const Music_FILES = [
  { id: "everybody", name: "Everybody Dies In Their Nightmares", icon: Icons.music, iconType: 'music', type: 'audio' },
  { id: "agartum", name: "Agar Tum Saath Ho.mp3", icon: Icons.music, iconType: 'music', type: 'audio' },

];
const Finder = ({ openApplication }) => {
  const [selectedPlace, setSelectedPlace] = useState("projects");

  const handleFileClick = (file) => {
    if (!openApplication) {
      console.error('openApplication function not provided to Finder');
      return;
    }

    switch (file.type) {
      case 'app':
        openApplication(file.id);
        break;
      case 'folder':
        openApplication('finder');
        break;
      case 'document':
        if (file.id === 'jsnotes') {
          openApplication('jsnotes');
        } else {
          openApplication('browser');
        }
        break;
      case 'pdf':
        if(file.id === 'resume') {
          openApplication('resume');
          break;
        }else if(file.id === 'linuxcommands') {
          openApplication('linuxcommands');
          break;
        }
      case 'text':
        openApplication('browser');
        break;
      case 'image':
        openApplication('imageViewer');
        break;
      case 'audio':
        openApplication('browser');
        break;
      default:
        openApplication('finder');
    }
  };

  const renderFiles = () => {
    switch(selectedPlace) {
      case "projects":
        return (
          <div className="finder-files">
            {PROJECT_FILES.map(file => (
              <div
                key={file.id}
                className="finder-file"
                onDoubleClick={() => handleFileClick(file)}
                title={`Open ${file.name}`}
              >
                <span className="finder-file-icon">{file.icon}</span>
                <span className="finder-file-name">{file.name}</span>
              </div>
            ))}
          </div>
        );
      
      case "documents":
        return (
          <div className="finder-files">
            {DOCUMENT_FILES.map(file => (
              <div
                key={file.id}
                className="finder-file"
                onDoubleClick={() => handleFileClick(file)}
                title={`Open ${file.name}`}
              >
                <span className="finder-file-icon">{file.icon}</span>
                <span className="finder-file-name">{file.name}</span>
              </div>
            ))}
          </div>
        );
      
      case "music":
        return (
          <div className="finder-files">
            {Music_FILES.map(file => (
              <div
                key={file.id}
                className="finder-file"
                onDoubleClick={() => handleFileClick(file)}
                title={`Open ${file.name}`}
              >
                <span className="finder-file-icon">{file.icon}</span>
                <span className="finder-file-name">{file.name}</span>
              </div>
            ))}
          </div>
        );
      
      default:
        return (
          <div className="finder-empty">
            No files in this folder.
          </div>
        );
    }
  };

  return (
    <div className="finder-root">
      <aside className="finder-sidebar">
        {PLACES.map(place => (
          <div
            key={place.id}
            className={`finder-place${selectedPlace === place.id ? " selected" : ""}`}
            onClick={() => setSelectedPlace(place.id)}
          >
            <span className="finder-place-icon">{place.icon}</span>
            <span className="finder-place-name">{place.name}</span>
          </div>
        ))}
      </aside>
      <main className="finder-main">
        <div className="finder-folder-title">{PLACES.find(p => p.id === selectedPlace)?.name}</div>
        {renderFiles()}
      </main>
    </div>
  );
};

// Add PropTypes for better error checking
Finder.propTypes = {
  openApplication: PropTypes.func.isRequired
};

export default Finder;