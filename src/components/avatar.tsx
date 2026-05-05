import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import avatar1 from '../assets/adapted_avatar_1.png';
import avatar2 from '../assets/adapted_avatar_2.png';
import avatar3 from '../assets/adapted_avatar_3.png';
import avatar4 from '../assets/adapted_avatar_4.png';
import avatar5 from '../assets/adapted_avatar_5.png';
import avatar6 from '../assets/adapted_avatar_6.png';
import avatar7 from '../assets/adapted_avatar_7.png';
import avatar8 from '../assets/adapted_avatar_8.png';
import avatar9 from '../assets/adapted_avatar_9.png';
import avatar10 from '../assets/adapted_avatar_10.png';

const avatars: StaticImageData[] = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
  avatar9,
  avatar10,
];

function getAvatarByUserId(id: number) {
  const avatarIndex =
    (((id - 1) % avatars.length) + avatars.length) % avatars.length;
  return avatars[avatarIndex];
}

export default function Avatar({ userId }: { userId: number }) {
  return <Image src={getAvatarByUserId(userId)} alt="" width={72} height={72} />;
}
