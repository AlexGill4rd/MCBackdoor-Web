export default interface IItemstack {
  itemmeta: {
    type: string;
    displayname?: string;
    amount: number;
    data?: string;
    lore?: string[];
    enchants?: string[];
    flags?: string[];
    extrameta?: {
      storedenchants?: any[];
      patterns?: string;
      basecolor?: string;
      customeffects?: string[];
      baseeffect?: {
        type?: string;
        isExtended?: boolean;
        isUpgraded?: boolean;
      };
      flicker?: boolean;
      trail?: boolean;
      colors?: any[];
      fadecolors?: any[];
      power?: number;
      effects?: {
        type?: string;
        flicker?: boolean;
        trail?: boolean;
        colors?: any[];
        fadecolors?: any[];
      };
    };
  };
  data?: {
    readable: string;
    id: string;
    texture: string;
  };
}
