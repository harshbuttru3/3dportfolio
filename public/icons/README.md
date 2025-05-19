# Custom Icons

Place your custom icon files (PNG, JPG, SVG) in this folder to use them in the desktop interface.

## How to Use Custom Icons

There are two ways to replace the default icons:

### Method 1: Replace SVG in BasicIcons.jsx

Edit the `src/components/Desktop/BasicIcons.jsx` file and replace the SVG code for any icon with your own SVG.

Example:
```jsx
terminal: (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="40" height="40">
    <!-- Your custom SVG code here -->
    <rect width="20" height="16" x="2" y="4" rx="2" fill="#222" />
    <path d="M4 7l4 4-4 4" stroke="#64FFDA" strokeWidth="1.5" fill="none" />
    <path d="M10 15h8" stroke="#64FFDA" strokeWidth="1.5" />
  </svg>
),
```

### Method 2: Use Image Files

1. Place your image files (PNG, JPG, SVG) in this folder
2. Edit `src/components/Desktop/BasicIcons.jsx` to use the `imageIcon` function:

```jsx
// Example for using an image file for an icon
finder: imageIcon('/icons/finder.png'),
```

## Recommended Icon Specifications

- Size: 512x512 pixels (will be displayed at 40x40)
- Format: PNG with transparency
- Style: Consistent color scheme with the desktop theme

## Icons to Replace

The following icons are used in the desktop:

- terminal
- browser
- finder
- blender
- discord
- telegram
- github
- spotify
- folder
- folderBlue
- document
- pdf
- text
- image
- music
- chatgpt 