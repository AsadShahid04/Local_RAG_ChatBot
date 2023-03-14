// @ts-nocheck
import { CautionIcon, LightningChargeIcon, SunIcon } from "assets/icons";

const items = [
  {
    icon: <SunIcon />,
    title: "Examples",
    subTitle: [
      `"Explain quantum computing in simple terms" →`,
      `"Got any creative ideas for a 10 year old’s birthday?" →`,
      `"How do I make an HTTP request in Javascript?" →`,
    ],
    hover: true,
  },
  {
    icon: <LightningChargeIcon />,
    title: "Capabilities",
    subTitle: [
      `Remembers what user said earlier in the conversation`,
      `Allows user to provide follow-up corrections`,
      `Trained to decline inappropriate requests`,
    ],
    hover: false,
  },
  {
    icon: <CautionIcon />,
    title: "Limitations",
    subTitle: [
      `May occasionally generate incorrect information`,
      `May occasionally produce harmful instructions or biased content`,
      `Limited knowledge of world and events after 2021`,
    ],
    hover: false,
  },
];

const ChatIntro = ({ title, setTemplateQuestion }) => {
  return (
    <>
      <h1 className="text-4xl text-gray-800 dark:text-gray-100 font-semibold text-center mt-6 sm:mt-[20vh] ml-auto mr-auto mb-10 sm:mb-16">
        {title}
      </h1>
      <div className="md:flex items-start text-center gap-3.5">
        {items.map((item, index) => (
          <div
            className="flex flex-col mb-8 md:mb-auto gap-3.5 flex-1"
            key={index}
          >
            <h2 className="flex gap-3 dark:text-gray-100 items-center m-auto text-lg font-normal md:flex-col md:gap-2">
              {item.icon}
              {item.title}
            </h2>
            <ul className="flex flex-col gap-3.5 w-full sm:max-w-md m-auto">
              {item.subTitle.map((subTitle, subTitleIndex) => (
                <button
                  className={`w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md  ${
                    item.hover
                      ? "hover:bg-gray-200 dark:hover:bg-black cursor-pointer"
                      : "cursor-text"
                  }`}
                  key={subTitleIndex}
                  onClick={() => {
                    if (item.hover) {
                      setTemplateQuestion(subTitle.slice(1, -3));
                    }
                  }}
                >
                  {subTitle}
                </button>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default ChatIntro;
