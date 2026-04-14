const KELVIN_TABLE: Record<number, [number, number, number]> = {
    2000: [255, 138, 18],
    2100: [255, 142, 33],
    2200: [255, 147, 44],
    2300: [255, 152, 54],
    2400: [255, 157, 63],
    2500: [255, 161, 72],
    2600: [255, 165, 79],
    2700: [255, 169, 87],
    2800: [255, 173, 94],
    2900: [255, 177, 101],
    3000: [255, 180, 107],
    3100: [255, 184, 114],
    3200: [255, 187, 120],
    3300: [255, 190, 126],
    3400: [255, 193, 132],
    3500: [255, 196, 137],
    3600: [255, 199, 143],
    3700: [255, 201, 148],
    3800: [255, 204, 153],
    3900: [255, 206, 159],
    4000: [255, 209, 163],
    4100: [255, 211, 168],
    4200: [255, 213, 173],
    4300: [255, 215, 177],
    4400: [255, 217, 182],
    4500: [255, 219, 186],
    4600: [255, 221, 190],
    4700: [255, 223, 194],
    4800: [255, 225, 198],
    4900: [255, 227, 202],
    5000: [255, 228, 206],
    5100: [255, 230, 210],
    5200: [255, 232, 213],
    5300: [255, 233, 217],
    5400: [255, 235, 220],
    5500: [255, 236, 224],
    5600: [255, 238, 227],
    5700: [255, 239, 230],
    5800: [255, 240, 233],
    5900: [255, 242, 236],
    6000: [255, 243, 239],
    6100: [255, 244, 242],
    6200: [255, 245, 245],
    6300: [255, 246, 247],
    6400: [255, 248, 251],
    6500: [255, 249, 253],
    6600: [254, 249, 255],
    6700: [252, 247, 255],
}

const GAMMA_RGB_TO_KELVIN: Record<string, number> = Object.entries(KELVIN_TABLE).reduce(
    (acc, [kelvin, [r, g, b]]) => {
        const key = `${gammaCorrect(r)},${gammaCorrect(g)},${gammaCorrect(b)}`;
        acc[key] = Number(kelvin);
        return acc;
    },
    {} as Record<string, number>
);

export function colorTempToRGB(kelvin: number): [number, number, number] | undefined {
    const rgb = KELVIN_TABLE[kelvin];
    if (!rgb) return undefined;
    return [gammaCorrect(rgb[0]), gammaCorrect(rgb[1]), gammaCorrect(rgb[2])];
}

export function rgbToColorTemp(r: number, g: number, b: number): number | undefined {
    return GAMMA_RGB_TO_KELVIN[`${r},${g},${b}`];
}

export function getConfigMode(r: number, g: number, b: number): 'wl' | 'cl' {
    return rgbToColorTemp(r, g, b) !== undefined ? 'wl' : 'cl';
}

function gammaCorrect(value: number): number {
    const clamped_value: number = Math.max(0, Math.min(255, value));
    return Math.floor(Math.pow(clamped_value / 255, 3) * 255);
}