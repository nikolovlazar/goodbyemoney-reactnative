import React, {
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import PagerView, {
  type PagerViewOnPageSelectedEvent,
} from 'react-native-pager-view';

export type RenderItem<T> = (info: {
  item: T;
  itemIndex: number;
  visiblePage: number;
}) => React.ReactElement;

export type LazyViewPagerHandle = { setPage(selectedPage: number): void };

interface LazyViewPagerProps<T> {
  /**
   * Number of items to render before and after the current page. Default 1.
   */
  buffer?: number;
  data: T[];
  /**
   * Index of starting page.
   */
  initialPage?: number;
  onPageSelected?: (page: number) => void;
  renderItem: RenderItem<T>;
  style?: StyleProp<ViewStyle>;
}

function computeOffset(page: number, numPages: number, buffer: number) {
  const windowLength = 1 + 2 * buffer;
  let offset: number;
  if (page <= buffer || numPages <= windowLength) {
    offset = 0;
  } else if (page >= 1 + numPages - windowLength) {
    offset = Math.max(0, numPages - windowLength);
  } else {
    offset = page - buffer;
  }
  return offset;
}

function sleep(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function renderPage<T>(
  renderItem: RenderItem<T>,
  item: T,
  itemIndex: number,
  visiblePage: number,
  buffer: number
) {
  const delta = Math.abs(itemIndex - visiblePage);
  return (
    <View key={itemIndex}>
      {delta <= buffer ? renderItem({ item, itemIndex, visiblePage }) : null}
    </View>
  );
}

function LazyViewPagerImpl<T>(
  props: LazyViewPagerProps<T>,
  ref: Ref<LazyViewPagerHandle>
) {
  // Internal buffer is larger; supports paging.
  const internalBuffer = 8;
  const buffer =
    (props.buffer == null ? 1 : Math.max(0, props.buffer)) + internalBuffer;

  // When set to `true`, forces `ViewPager` to remount.
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(() =>
    props.initialPage == null ? 0 : Math.max(0, props.initialPage)
  );
  const [offset, setOffset] = useState(() =>
    computeOffset(page, props.data.length, buffer)
  );
  const targetOffset = useRef(offset);
  const vpRef = useRef<PagerView>(null);

  const onPageSelected = (event: PagerViewOnPageSelectedEvent) => {
    if (offset === targetOffset.current) {
      setPage(event.nativeEvent.position + offset);
    }
  };

  useEffect(() => {
    if (isRefreshing) {
      setIsRefreshing(false);
    }
  }, [isRefreshing, setIsRefreshing]);

  useEffect(() => {
    const state = { live: true };
    // Rate limit offset updates.
    sleep(1100).then(() => {
      if (state.live) {
        targetOffset.current = computeOffset(page, props.data.length, buffer);
        setOffset(targetOffset.current);
      }
    });
    return () => {
      state.live = false;
    };
  }, [buffer, page, props.data.length, setOffset, targetOffset]);

  // Broadcast page selected event.
  const clientOnPageSelected = props.onPageSelected;
  useEffect(() => {
    if (clientOnPageSelected != null) {
      clientOnPageSelected(page);
    }
  }, [clientOnPageSelected, page]);

  const windowLength = 1 + 2 * buffer;

  useImperativeHandle(
    ref,
    () => ({
      setPage: (selectedPage: number) => {
        if (vpRef.current != null) {
          const vpPage = selectedPage - offset;
          if (vpPage >= 0 && vpPage < windowLength) {
            // Inside render window, navigate normally.
            vpRef.current.setPage(vpPage);
            return;
          }
        }

        // Remount component to navigate to `selectedPage`.
        // TODO: Is there a cleaner way that does not involve forcing a
        //       rebuild of `ViewPager`?
        const newOffset = computeOffset(
          selectedPage,
          props.data.length,
          buffer
        );
        targetOffset.current = newOffset;
        setOffset(newOffset);
        setPage(selectedPage);
        setIsRefreshing(true);
      },
    }),
    [
      buffer,
      offset,
      props.data.length,
      setIsRefreshing,
      setOffset,
      setPage,
      targetOffset,
      vpRef,
      windowLength,
    ]
  );

  return isRefreshing ? (
    <View style={props.style} />
  ) : (
    <PagerView
      initialPage={page - offset}
      ref={vpRef}
      style={props.style}
      onPageSelected={onPageSelected}
    >
      {props.data
        .slice(offset, offset + windowLength)
        .map((item, index) =>
          renderPage(
            props.renderItem,
            item,
            offset + index,
            page,
            buffer - internalBuffer
          )
        )}
    </PagerView>
  );
}

export const LazyViewPager = forwardRef(LazyViewPagerImpl);
