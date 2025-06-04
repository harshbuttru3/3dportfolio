import { useGLTF } from '@react-three/drei';

export const preloadModels = () => {
  const models = [
    '/models/optimizedman.glb',
    '/models/optimizedchair.glb',
    '/models/optimizeddesk.glb'
  ];
  
  models.forEach(path => useGLTF.preload(path));
};