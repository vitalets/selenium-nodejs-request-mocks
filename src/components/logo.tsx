import Image from 'next/image';
import logo from '../assets/logo.png';

export default function Logo() {
  return (
    <header className="site-header">
      <Image
        className="conference-logo"
        src={logo}
        alt="Selenium Conference and Appium Conf"
        priority
      />
    </header>
  );
}
