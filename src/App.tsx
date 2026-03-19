import { PureCell } from '@alfalab/core-components/pure-cell/cssm';
import { Typography } from '@alfalab/core-components/typography/cssm';
import { FlashMIcon } from '@alfalab/icons-glyph/FlashMIcon';
import { useEffect, useState } from 'react';
import allImg from './assets/all.png';
import obrazImg from './assets/obraz.png';
import playImg from './assets/play.png';
import readImg from './assets/read.png';
import { useArticlesData } from './hooks/useStocksData';
import { LS, LSKeys } from './ls';
import { appSt } from './style.css';
import { formatWord } from './utils/words';

const categoryToIndex: Record<string, number> = {
  Образовательный: 1,
  Игры: 2,
  Сторител: 3,
  Прочее: 4,
};

export const App = () => {
  const { articlesData } = useArticlesData();
  const [view, setView] = useState<'list' | 'grid'>('grid');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    if (!LS.getItem(LSKeys.UserId, null)) {
      LS.setItem(LSKeys.UserId, Date.now());
    }
  }, []);

  const grouped = articlesData.articles.reduce<Record<string, typeof articlesData.articles>>((acc, article) => {
    if (!acc[article.category]) acc[article.category] = [];
    acc[article.category].push(article);
    return acc;
  }, {});

  const visibleGrouped = activeCategory ? { [activeCategory]: grouped[activeCategory] ?? [] } : grouped;

  if (view === 'list') {
    return (
      <div className={appSt.container}>
        {Object.entries(visibleGrouped).map(([category, articles]) => (
          <div key={category} className={appSt.section}>
            <div className={appSt.sectionHeader}>
              <Typography.TitleResponsive
                style={{ marginTop: '1rem' }}
                tag="h1"
                view="medium"
                font="system"
                weight="semibold"
              >
                {category}
              </Typography.TitleResponsive>
            </div>
            <Typography.Text view="primary-medium" tag="span" color="secondary" style={{ marginBottom: '8px' }}>
              Найдено {formatWord(articles.length, ['статья', 'статьи', 'статей'])}
            </Typography.Text>
            {articles.map((article, idx) => (
              <PureCell
                key={idx}
                href={article.link}
                className={appSt.articleCard}
                onClick={() => {
                  window.gtag('event', '7442_longread_click', {
                    var: 'var1',
                    section: `s${activeCategory ? categoryToIndex[activeCategory] : 4}`,
                    longread: `s${activeCategory ? categoryToIndex[activeCategory] : 4}_l${idx + 1}`,
                  });
                  window.location.replace(article.link);
                }}
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
  }

  return (
    <div className={appSt.container}>
      <Typography.TitleResponsive style={{ marginTop: '1rem' }} tag="h1" view="medium" font="system" weight="semibold">
        Инвестиции на простом
      </Typography.TitleResponsive>

      <div className={appSt.grid}>
        <div
          className={appSt.gridItem}
          onClick={() => {
            window.gtag('event', '7442_section_click', { var: 'var2', section: 's1' });
            setView('list');
            setActiveCategory('Образовательный');
          }}
        >
          <img src={obrazImg} width={154} height={140} />
          <Typography.Text view="primary-medium" weight="medium">
            Образовательный
          </Typography.Text>
        </div>
        <div
          className={appSt.gridItem}
          onClick={() => {
            window.gtag('event', '7442_section_click', { var: 'var2', section: 's2' });
            setView('list');
            setActiveCategory('Игры');
          }}
        >
          <img src={playImg} width={154} height={140} />
          <Typography.Text view="primary-medium" weight="medium">
            Игры
          </Typography.Text>
        </div>
        <div
          className={appSt.gridItem}
          onClick={() => {
            window.gtag('event', '7442_section_click', { var: 'var2', section: 's3' });
            setView('list');
            setActiveCategory('Сторител');
          }}
        >
          <img src={readImg} width={154} height={140} />
          <Typography.Text view="primary-medium" weight="medium">
            Сторител
          </Typography.Text>
        </div>
        <div
          className={appSt.gridItem}
          onClick={() => {
            window.gtag('event', '7442_section_click', { var: 'var2', section: 's4' });
            setView('list');
            setActiveCategory(null);
          }}
        >
          <img src={allImg} width={154} height={140} />
          <Typography.Text view="primary-medium" weight="medium">
            Все рубрики
          </Typography.Text>
        </div>
      </div>
    </div>
  );
};
