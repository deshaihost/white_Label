import imgImage1 from "figma:asset/4c0ec27440a898172c0fcd64199f4c75ebbd53a9.png";
import imgImage2 from "figma:asset/932a43c08c4003250d6bbe41bb691ded54142a85.png";
import imgImage3 from "figma:asset/bc62d25ea56f1713c9c4b8b01f8d047104db9b13.png";

export default function Group1() {
  return (
    <div className="relative size-full">
      <div className="absolute h-[867px] left-[13px] top-0 w-[1686px]" data-name="image 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage1} />
      </div>
      <div className="absolute h-[999px] left-[13px] top-[867px] w-[1683px]" data-name="image 2">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage2} />
      </div>
      <div className="absolute h-[1031px] left-0 top-[1842px] w-[1722px]" data-name="image 3">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage3} />
      </div>
    </div>
  );
}