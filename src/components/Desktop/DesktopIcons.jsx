import React from 'react';
import './Desktop.css';
import { Icons } from './BasicIcons';

const DesktopIcons = ({ openApplication }) => {
  // Desktop icons based on your screenshot
  const desktopItems = [
    { id: 'photo', name: 'photo_2025-04-10_03-50-19.jpg', iconType: 'image', type: 'image' },
    // { id: 'cisco', name: 'cisco', iconType: 'folder', type: 'folder' },
    { id: 'jsnotes', name: 'Javascript notes', iconType: 'document', type: 'document' },
    { id: 'resume', name: 'Resume.pdf', iconType: 'pdf', type: 'pdf' },
    { id: 'linux', name: '100_Linux_Commands', iconType: 'pdf', type: 'pdf' },
    // { id: 'akele', name: 'Akele raho by osho.mp3', iconType: 'music', type: 'audio' },
    { id: 'droidcam', name: 'droidcam.txt', iconType: 'text', type: 'app' },
    { id: 'chatgpt', name: 'Recursive', iconType: 'chatgpt', type: 'app' },
    // { id: 'amani', name: 'amani.pdf', iconType: 'pdf', type: 'pdf' },
    { id: 'projects', name: 'projects', iconType: 'folder', type: 'folder' },
    // { id: 'documents', name: 'Documents', iconType: 'folder', type: 'folder' }
  ];

  // Get appropriate icon for item
  const getIcon = (iconType) => {
    // If the icon type exists directly in Icons object, use that
    if (Icons[iconType]) {
      return Icons[iconType];
    }
    
    // Otherwise fallback to appropriate icon based on type
    switch(iconType) {
      case 'folder':
        return Icons.folder;
      case 'folderBlue':
        return Icons.folderBlue;
      case 'document':
        return Icons.document;
      case 'pdf':
        return Icons.pdf;
      case 'text':
        return Icons.text;
      case 'image':
        return Icons.image;
      case 'music':
        return Icons.music;
      default:
        return Icons.browser;
    }
  };

  // Handle click on desktop icon
  const handleIconClick = (item) => {
    switch (item.type) {
      case 'app':
        // Open corresponding app
        if (item.id === 'chatgpt'){
           openApplication('chatgpt');
          break;
        }
        if( item.id === 'droidcam') openApplication('droidcam');
        break;
      case 'folder':
        openApplication('finder');
        break;
      case 'document':
        if (item.id === 'jsnotes') {
        openApplication('jsnotes');
        break;
        }
      case 'pdf':
        if(item.id === 'resume'){
          openApplication('resume');
          break;
        }
        if(item.id === 'linux'){
          openApplication('linuxcommands');
          break;
        }
        break;
      case 'text':
        // Open document viewer
        openApplication('browser');
        break;
      case 'image':
        // Open image viewer
        openApplication('imageViewer');
        break;
      case 'audio':
        // Open audio player
        openApplication('browser');
        break;
      default:
        openApplication('finder');
    }
  };

  return (
    <div className="desktop-icons">
      {desktopItems.map(item => (
        <div 
          key={item.id}
          className="desktop-icon-wrapper"
          onClick={() => handleIconClick(item)}
        >
          <div className="desktop-icon">
            {getIcon(item.iconType)}
          </div>
          <div className="desktop-icon-label">{item.name}</div>
        </div>
      ))}
    </div>
  );
};

export default DesktopIcons; 