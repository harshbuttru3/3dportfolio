# Custom 3D Models

This directory is where you can place your custom 3D models for the portfolio website.

## Supported Model Formats

The portfolio site uses Three.js and supports the following formats:
- GLB/GLTF (recommended)
- OBJ
- FBX

## How to Add Custom Models

1. Place your model files in this directory
2. Update the `modelPaths` object in `src/components/Scene.jsx`:

```jsx
const modelPaths = {
  human: "/models/your-human-model.glb",
  chair: "/models/your-chair-model.glb",
  desk: "/models/your-desk-model.glb"
};
```

## Model Requirements

- Keep file sizes small (under 5MB if possible) for better performance
- Ensure models have proper scaling (they will be scaled in the Scene component)
- Test your models in the application to ensure they look and behave correctly

## Default Fallbacks

If a model fails to load or is not provided, the application will automatically use the simple primitive shapes as fallbacks. 