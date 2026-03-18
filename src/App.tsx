import { PureCell } from '@alfalab/core-components/pure-cell/cssm';
import { Tag } from '@alfalab/core-components/tag/cssm';
import { Typography } from '@alfalab/core-components/typography/cssm';
import { FlashMIcon } from '@alfalab/icons-glyph/FlashMIcon';
import { useEffect, useState } from 'react';
import { useArticlesData } from './hooks/useStocksData';
import { LS, LSKeys } from './ls';
import { appSt } from './style.css';
import { formatWord } from './utils/words';

export const App = () => {
  const { articlesData } = useArticlesData();

  useEffect(() => {
    if (!LS.getItem(LSKeys.UserId, null)) {
      LS.setItem(LSKeys.UserId, Date.now());
    }
  }, []);

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const grouped = articlesData.articles.reduce<Record<string, typeof articlesData.articles>>((acc, article) => {
    if (!acc[article.category]) acc[article.category] = [];
    acc[article.category].push(article);
    return acc;
  }, {});

  const categories = Object.keys(grouped);

  const visibleGrouped = activeCategory ? { [activeCategory]: grouped[activeCategory] ?? [] } : grouped;

  return (
    <div className={appSt.container}>
      <Typography.TitleResponsive style={{ marginTop: '1rem' }} tag="h1" view="medium" font="system" weight="semibold">
        Инвестиции на простом
      </Typography.TitleResponsive>

      <div className={appSt.tagsRow}>
        <Tag
          view="filled"
          size="xs"
          shape="rounded"
          checked={activeCategory === null}
          onClick={() => setActiveCategory(null)}
        >
          Все рубрики
        </Tag>
        {categories.map(cat => (
          <Tag
            key={cat}
            view="filled"
            size="xs"
            shape="rounded"
            checked={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </Tag>
        ))}
      </div>

      {Object.entries(visibleGrouped).map(([category, articles]) => (
        <div key={category} className={appSt.section}>
          <div className={appSt.sectionHeader}>
            <Typography.Text view="primary-medium" tag="span">
              {category}
            </Typography.Text>
            <Typography.Text view="primary-medium" tag="span" color="secondary">
              {formatWord(articles.length, ['статья', 'статьи', 'статей'])}
            </Typography.Text>
          </div>
          {articles.map((article, idx) => (
            <PureCell
              key={idx}
              href={article.link}
              className={appSt.articleCard}
              onClick={() => window.gtag('event', `7310_article_var2`)}
            >
              <PureCell.Content>
                <PureCell.Main>
                  {article.new && (
                    <div className={appSt.newBadge}>
                      <FlashMIcon width={18} height={18} color="#2A77EF" />
                      <span className={appSt.newText}>Новое</span>
                    </div>
                  )}
                  <Typography.Text view="primary-medium" tag="p" defaultMargins={false} className={appSt.articleTitle}>
                    {article.title}
                  </Typography.Text>
                </PureCell.Main>
              </PureCell.Content>
              <PureCell.Graphics>
                <img src={article.img} alt={article.title} className={appSt.articleImg} width={88} height={80} />
              </PureCell.Graphics>
            </PureCell>
          ))}
        </div>
      ))}
    </div>
  );
};
