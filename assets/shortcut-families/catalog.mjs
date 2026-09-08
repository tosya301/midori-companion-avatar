export const families = [
  { id:'mail', name:'邮箱', root:'gmail', apps:['gmail','outlook','qq'] },
  { id:'music', name:'音乐', root:'spotify', apps:['spotify','applemusic','netease','qqmusic'] },
  { id:'social', name:'社交', root:'x', apps:['x','xiaohongshu','instagram'] },
  { id:'creative', name:'创作', root:'figma', apps:['figma','blender','photoshop','aftereffects'] },
  { id:'video', name:'视频', root:'youtube', apps:['youtube','bilibili','tiktok'] },
];
const icon = name => new URL(`./icons/${name}.png`, import.meta.url).href;
const original = name => new URL(`../site-icons/${name}.png`, import.meta.url).href;
export const apps = {
  gmail:{name:'Gmail',src:icon('gmail'),href:'https://mail.google.com/mail/u/0/#inbox',context:'gmail'},
  outlook:{name:'Outlook',src:icon('outlook'),href:'https://outlook.live.com/mail/0/'},
  qq:{name:'QQ邮箱',src:icon('qq'),href:'https://mail.qq.com/'},
  spotify:{name:'Spotify',src:original('spotify'),href:'https://open.spotify.com/',context:'spotify'},
  applemusic:{name:'Apple Music',src:icon('applemusic'),href:'https://music.apple.com/'},
  netease:{name:'网易云音乐',src:icon('netease'),href:'https://music.163.com/'},
  qqmusic:{name:'QQ音乐',src:icon('qqmusic'),href:'https://y.qq.com/'},
  x:{name:'X',src:original('x'),href:'https://x.com/',context:'x'},
  xiaohongshu:{name:'小红书',src:icon('xiaohongshu'),href:'https://www.xiaohongshu.com/explore'},
  instagram:{name:'Instagram',src:icon('instagram'),href:'https://www.instagram.com/'},
  figma:{name:'Figma',src:original('figma'),href:'https://www.figma.com/',context:'figma'},
  blender:{name:'Blender',src:icon('blender'),launch:'blender'},
  photoshop:{name:'PS',fullName:'Adobe Photoshop',src:icon('photoshop'),href:'https://www.adobe.com/products/photoshop.html'},
  aftereffects:{name:'AE',fullName:'Adobe After Effects',src:icon('aftereffects'),href:'https://www.adobe.com/products/aftereffects.html'},
  youtube:{name:'YouTube',src:original('youtube'),href:'https://www.youtube.com/',context:'youtube'},
  bilibili:{name:'Bilibili',src:original('bilibili'),href:'https://www.bilibili.com/',context:'bilibili'},
  tiktok:{name:'TikTok',src:icon('tiktok'),href:'https://www.tiktok.com/'},
};
export const storageKey=id=>`midori.shortcut-family.v1.${id}`;
export function restoreOrder(family, stored){
  try{const value=JSON.parse(stored);if(Array.isArray(value)&&value.length===family.apps.length&&new Set(value).size===value.length&&value.every(id=>family.apps.includes(id)))return value;}catch{}
  return [...family.apps];
}
export function swapSlot(order,index){
  if(!Number.isInteger(index)||index<1||index>=order.length)throw new RangeError('Invalid secondary slot');
  const result=[...order];[result[0],result[index]]=[result[index],result[0]];return result;
}
