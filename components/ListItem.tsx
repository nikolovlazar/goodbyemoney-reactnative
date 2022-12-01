import React, { useMemo } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { theme } from '../theme';

type Props = {
  label: string;
  detail?: React.ReactNode;
  onClick?: () => void;
  swipeToDelete?: boolean;
  onDelete?: () => void;
  isDestructive?: boolean;
};

export const ListItem = ({
  label,
  detail,
  onClick,
  swipeToDelete,
  onDelete,
  isDestructive,
}: Props) => {
  const item = useMemo(
    () => (
      <TouchableOpacity
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: !!detail ? 'space-between' : 'flex-start',
          alignItems: 'center',
          minHeight: 44,
          paddingHorizontal: 12,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
          backgroundColor: theme.colors.card,
        }}
        onPress={onClick}
        disabled={!onClick}
      >
        <Text
          style={{
            fontSize: 16,
            color: isDestructive ? theme.colors.error : 'white',
          }}
        >
          {label}
        </Text>
        {detail}
      </TouchableOpacity>
    ),
    [label, detail]
  );
  if (swipeToDelete) {
    return (
      <Swipeable
        renderRightActions={() => (
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: 100,
            }}
            onPress={onDelete}
          >
            <Text style={{ color: 'white' }}>Delete</Text>
          </TouchableOpacity>
        )}
        onSwipeableRightOpen={onDelete}
      >
        {item}
      </Swipeable>
    );
  }
  return item;
};
