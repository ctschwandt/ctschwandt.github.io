const assets: Record<string, {src: string; srcSet: string; width: number; height: number}> = {
  "/images/experience/construction.jpg": {
    "src": "/images/experience/construction.webp",
    "srcSet": "/images/experience/construction-480.webp 480w, /images/experience/construction.webp 562w",
    "width": 562,
    "height": 1218
  },
  "/images/experience/mbs.jpg": {
    "src": "/images/experience/mbs.webp",
    "srcSet": "/images/experience/mbs-480.webp 480w, /images/experience/mbs.webp 1200w",
    "width": 1200,
    "height": 900
  },
  "/images/experience/mutrux.jpg": {
    "src": "/images/experience/mutrux.webp",
    "srcSet": "/images/experience/mutrux-480.webp 480w, /images/experience/mutrux.webp 1200w",
    "width": 1200,
    "height": 1600
  },
  "/images/experience/reu.jpg": {
    "src": "/images/experience/reu.webp",
    "srcSet": "/images/experience/reu-480.webp 480w, /images/experience/reu.webp 1200w",
    "width": 1200,
    "height": 900
  },
  "/images/experience/tutor.jpg": {
    "src": "/images/experience/tutor.webp",
    "srcSet": "/images/experience/tutor-480.webp 480w, /images/experience/tutor.webp 1200w",
    "width": 1200,
    "height": 800
  },
  "/images/profile.png": {
    "src": "/images/profile.webp",
    "srcSet": "/images/profile-480.webp 480w, /images/profile.webp 751w",
    "width": 751,
    "height": 750
  },
  "/images/projects/java_othello1.png": {
    "src": "/images/projects/java_othello1.webp",
    "srcSet": "/images/projects/java_othello1-480.webp 480w, /images/projects/java_othello1.webp 491w",
    "width": 491,
    "height": 500
  },
  "/images/projects/maze1.png": {
    "src": "/images/projects/maze1.webp",
    "srcSet": "/images/projects/maze1-480.webp 480w, /images/projects/maze1.webp 844w",
    "width": 844,
    "height": 615
  },
  "/images/projects/maze2.png": {
    "src": "/images/projects/maze2.webp",
    "srcSet": "/images/projects/maze2-480.webp 480w, /images/projects/maze2.webp 778w",
    "width": 778,
    "height": 606
  },
  "/images/projects/maze3.png": {
    "src": "/images/projects/maze3.webp",
    "srcSet": "/images/projects/maze3-480.webp 480w, /images/projects/maze3.webp 1084w",
    "width": 1084,
    "height": 783
  },
  "/images/projects/maze4.png": {
    "src": "/images/projects/maze4.webp",
    "srcSet": "/images/projects/maze4-480.webp 480w, /images/projects/maze4.webp 665w",
    "width": 665,
    "height": 626
  },
  "/images/projects/mips1.png": {
    "src": "/images/projects/mips1.webp",
    "srcSet": "/images/projects/mips1-480.webp 480w, /images/projects/mips1.webp 688w",
    "width": 688,
    "height": 702
  },
  "/images/projects/quad2.png": {
    "src": "/images/projects/quad2.webp",
    "srcSet": "/images/projects/quad2-480.webp 480w, /images/projects/quad2.webp 631w",
    "width": 631,
    "height": 649
  },
  "/images/projects/talbook4.png": {
    "src": "/images/projects/talbook4.webp",
    "srcSet": "/images/projects/talbook4-480.webp 480w, /images/projects/talbook4.webp 922w",
    "width": 922,
    "height": 817
  }
};
export function imageAttributes(src: string) { return assets[src] ?? { src }; }
