import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ArticleCard } from "./";
import { APIUtils } from "../../../services";


const articles = [
        {
            "@id": "/api/articles/2",
            "@type": "Article",
            "id": 2,
            "title": "Il aurait mieux valu, dit le notaire. La séance était finie; la.",
            "category": "news",
            "publishDate": "2018-05-01T02:16:21+02:00",
            "excerpt": "L'air du bal était lourd; les lampes pâlissaient. On refluait dans la salle de billard. Un domestique monta sur une chaise et cassa deux.",
            "image": "/upload/faker_article/2b512b15969ca8fd29d4ebe1167e4f46.jpg"
        },
        {
            "@id": "/api/articles/4",
            "@type": "Article",
            "id": 4,
            "title": "Elle resta jusqu'au soir perdu dans une église. En face montait un.",
            "category": "tutorial",
            "publishDate": "2018-04-25T04:58:32+02:00",
            "excerpt": "Mais à peine l'oedème eut-il un peu disparu, que les deux savants jugèrent à propos de rétablir le membre dans l'appareil, et en l'y.",
            "image": "/upload/faker_article/2b512b15969ca8fd29d4ebe1167e4f46.jpg"
        }
    ];

storiesOf("Cards", module).add("Article Card", () => (
  <div style={{backgroundColor: '#eff3f4',padding:'5rem', display: 'flex', }}>
      <ArticleCard
        type={articles[0].category}
        imageUrl={articles[0].image}
        imageAlt="image"
        title="Lorem Ipsum dolor sit"
        text="La vidange ne nécessite pas une intervention dans un garage et peut être réalisée par vos soins. Quelques précautions sont à prendre, on vous explique tout ici."
      />
      <ArticleCard
          type={articles[1].category}
          imageUrl={articles[0].image}
          imageAlt="image"
          title="Comment faire soi-même sa vidance ?"
          text="La vidange ne nécessite pas une intervention dans un garage et peut être réalisée par vos soins. Quelques précautions sont à prendre, on vous explique tout ici."
      />
  </div>
));
