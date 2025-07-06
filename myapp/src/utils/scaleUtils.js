export const dressPresets = {
  small: { height: 1, bust: 8, waist: 6, hips: 8 },
  medium: { height: 165, bust: 90, waist: 70, hips: 95 },
  large: { height: 172, bust: 98, waist: 78, hips: 105 }
};

export const dressFiles = {
  Cindrella: "/models/dress.glb",
  skirt: "/models/jumpsuit.glb",
  pant: "/models/dress8.glb"
};

// 🎯 Each dress type and size has a specific scale [X, Y, Z]
export const dressScales = {
  Cindrella: {
    small: [0.009, 0.0097, 0.0119],
    medium: [0.01, 0.01, 0.0125],
    large: [0.0115, 0.0105, 0.015]
  },
  skirt: {
    small: [1.0, 1.0, 1.9],
    medium: [1.2, 1.0, 1.9],
    large: [1.3, 1.05, 2.3]
  },
  pant: {
    small: [0.85, 0.9, 0.9],
    medium: [1, 1.05, 1],
    large: [1.1, 1.1, 1.15]
  }
};

export function calculateAvatarScale({ height, bust, waist, hips }) {
  const base = dressPresets.medium;
  const scaleY = height / base.height;
  const scaleX = (bust / base.bust + waist / base.waist) / 2;
  const scaleZ = (waist / base.waist + hips / base.hips) / 2;
  return [scaleX, scaleY, scaleZ];
}

export function isDressFit(user, dress) {
  const tolerance = 0.1;
  return (
    Math.abs(user.height - dress.height) / dress.height < tolerance &&
    Math.abs(user.bust - dress.bust) / dress.bust < tolerance &&
    Math.abs(user.waist - dress.waist) / dress.waist < tolerance &&
    Math.abs(user.hips - dress.hips) / dress.hips < tolerance
  );
}
