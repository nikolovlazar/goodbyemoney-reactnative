import { View, Text } from 'react-native';
import { theme } from '../theme';
import { Category } from '../types/category';

export const CategoryRow = ({ color, name }: Omit<Category, 'id'>) => (
  <View
    style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      justifyContent: 'flex-start',
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      backgroundColor: theme.colors.card,
    }}
  >
    <View
      style={{
        backgroundColor: color,
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 2,
        borderColor: 'white',
      }}
    />
    <Text style={{ color: 'white', fontSize: 16, marginLeft: 8 }}>{name}</Text>
  </View>
);
