import React, { useState } from 'react';
import { ScrollView, RefreshControl } from 'react-native';

const PullToRefreshWrapper = ({ children }) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Fetch data or perform any action here
    setTimeout(() => {
      setRefreshing(false);
    }, 2000); // Simulating a delay
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      {children}
    </ScrollView>
  );
};

export default PullToRefreshWrapper;