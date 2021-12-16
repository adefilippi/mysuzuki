import React from "react";
import { storiesOf } from "@storybook/react";
import {AccordionSection} from "./";
import {ICON_NAMES} from "../../Icon";

storiesOf("Accordion", module).add("Accordion Section", () => (
    <AccordionSection
      title="Garanties & Extensions"
      icon={ICON_NAMES.PHONE}
    >
        <p>Lorem ipsum <strong>dolor sit amet</strong>, consectetur adipiscing elit. <em>Donec ac velit sit amet ligula</em> congue posuere. <u>Suspendisse luctus</u> ligula lorem, at fringilla sapien laoreet id. <s>Phasellus fringilla nibh</s> vel vestibulum vestibulum. Vivamus tincidunt, risus nec auctor convallis, diam ligula facilisis diam, ut faucibus nunc justo non diam. Duis bibendum tortor metus, ac tincidunt augue tincidunt id. Aliquam ut orci tortor. Maecenas a nulla sit amet nulla tincidunt tristique id eu dolor. Aliquam in luctus lacus. Pellentesque neque libero, accumsan sed massa ac, viverra condimentum nisl. Morbi nec vulputate lectus, at porta lectus. Phasellus maximus scelerisque ante.</p>
        <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
        </ul>
        <p>Vivamus vel ligula a mauris consequat commodo. Sed feugiat quis est ac imperdiet. Nam nec risus elementum, malesuada justo at, pharetra diam. Nunc a egestas sapien. Morbi vel consectetur urna. Suspendisse aliquam scelerisque vulputate. Nullam bibendum, leo id faucibus dignissim, velit neque rutrum elit, vel fringilla nunc dolor eget nibh. In vehicula enim vitae ligula scelerisque, a pellentesque purus sagittis. In varius hendrerit felis, ac mattis purus. Nunc mollis malesuada rhoncus. Sed eget euismod metus, eget ultrices felis.</p>
    </AccordionSection>
));
