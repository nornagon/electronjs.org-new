import React from 'react';
import clsx from 'clsx';
import { isActiveSidebarItem, ThemeClassNames } from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';
import isInternalUrl from '@docusaurus/isInternalUrl';
import IconExternalLink from '@theme/IconExternalLink';
import styles from './Link.module.css';
import TagContent from './TagContent';
export default function DocSidebarItemLink({
  item,
  onItemClick,
  activePath,
  level,
  _index,
  ...props
}) {
  const { href, label, className, customProps } = item;
  const isActive = isActiveSidebarItem(item, activePath);
  const isInternalLink = isInternalUrl(href);
  const hasTags =
    customProps &&
    Array.isArray(customProps.tags) &&
    customProps.tags.length > 0; // SWIZZLED
  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemLink,
        ThemeClassNames.docs.docSidebarItemLinkLevel(level),
        'menu__list-item',
        className
      )}
      key={label}
    >
      <Link
        className={clsx(
          'menu__link',
          styles.menuLink, // swizzle just this line for alignment styling
          !isInternalLink && styles.menuExternalLink,
          {
            'menu__link--active': isActive,
          }
        )}
        aria-current={isActive ? 'page' : undefined}
        to={href}
        {...(isInternalLink && {
          onClick: onItemClick ? () => onItemClick(item) : undefined,
        })}
        {...props}
      >
        {label}
        {!isInternalLink && <IconExternalLink />}

        {
          // BEGIN SWIZZLED CODE
          hasTags && (
            <ul className={styles.tagContainer}>
              {customProps.tags.map((tag) => (
                <li
                  className={clsx('badge', styles.badge, styles[tag])}
                  key={tag}
                >
                  <TagContent platform={tag} />
                </li>
              ))}
            </ul>
          )
          // END SWIZZLED CODE
        }
      </Link>
    </li>
  );
}
