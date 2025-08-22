import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useReceiptStore } from '../../../store/receiptStore';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';
import { Button } from '../../../components/common/Button';
import { Card } from '../../../components/common/Card';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { formatDate } from '../../../utils/dateFormatter';

export const ResultScreen: React.FC = () => {
  const navigation = useNavigation();
  const { receipts, getTotalSpent } = useReceiptStore();
  const [selectedReceipt, setSelectedReceipt] = useState(0);

  const totalSpent = getTotalSpent();
  const completedReceipts = receipts.filter(receipt => receipt.status === 'completed');

  const handleEditReceipt = (receiptId: string) => {
    Alert.alert('Edit Receipt', 'Edit functionality is not implemented yet.');
  };

  const handleDeleteReceipt = (receiptId: string) => {
    Alert.alert(
      'Delete Receipt',
      'Are you sure you want to delete this receipt?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => {
          // Delete receipt logic would go here
          Alert.alert('Deleted', 'Receipt has been deleted.');
        }},
      ]
    );
  };

  const handleCaptureNew = () => {
    // Navigate to capture screen
    // navigation.navigate('Capture');
    Alert.alert('Capture', 'Navigate to capture screen');
  };

  const handleExportData = () => {
    Alert.alert('Export', 'Export functionality is not implemented yet.');
  };

  const renderReceiptItem = (receipt: any, index: number) => {
    const isSelected = index === selectedReceipt;
    
    return (
      <Card
        key={receipt.id}
        variant={isSelected ? 'elevated' : 'outlined'}
        padding="medium"
        margin="small"
        onPress={() => setSelectedReceipt(index)}
        style={[
          styles.receiptCard,
          isSelected && styles.selectedReceiptCard,
        ]}
      >
        <View style={styles.receiptHeader}>
          <Text style={styles.merchantName}>{receipt.merchantName}</Text>
          <Text style={styles.receiptAmount}>
            ${receipt.totalAmount.toFixed(2)}
          </Text>
        </View>
        
        <View style={styles.receiptDetails}>
          <Text style={styles.receiptDate}>
            {formatDate(receipt.date, 'short')}
          </Text>
          <Text style={styles.receiptCategory}>{receipt.category}</Text>
        </View>
        
        {isSelected && (
          <View style={styles.receiptActions}>
            <Button
              title="Edit"
              onPress={() => handleEditReceipt(receipt.id)}
              variant="outline"
              size="small"
              style={styles.actionButton}
            />
            <Button
              title="Delete"
              onPress={() => handleDeleteReceipt(receipt.id)}
              variant="danger"
              size="small"
              style={styles.actionButton}
            />
          </View>
        )}
      </Card>
    );
  };

  return (
    <ScreenWrapper scrollable>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Receipt Results</Text>
          <Text style={styles.subtitle}>
            View and manage your processed receipts
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <Card variant="elevated" padding="medium" style={styles.statCard}>
            <Text style={styles.statLabel}>Total Receipts</Text>
            <Text style={styles.statValue}>{completedReceipts.length}</Text>
          </Card>
          
          <Card variant="elevated" padding="medium" style={styles.statCard}>
            <Text style={styles.statLabel}>Total Spent</Text>
            <Text style={styles.statValue}>${totalSpent.toFixed(2)}</Text>
          </Card>
        </View>

        <View style={styles.receiptsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Receipts</Text>
            <TouchableOpacity onPress={handleExportData}>
              <Text style={styles.exportText}>Export</Text>
            </TouchableOpacity>
          </View>
          
          {completedReceipts.length > 0 ? (
            <ScrollView
              style={styles.receiptsList}
              showsVerticalScrollIndicator={false}
            >
              {completedReceipts.map((receipt, index) =>
                renderReceiptItem(receipt, index)
              )}
            </ScrollView>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateIcon}>📄</Text>
              <Text style={styles.emptyStateTitle}>No Receipts Yet</Text>
              <Text style={styles.emptyStateText}>
                Start by capturing your first receipt to see results here.
              </Text>
            </View>
          )}
        </View>

        <View style={styles.actions}>
          <Button
            title="Capture New Receipt"
            onPress={handleCaptureNew}
            fullWidth
            style={styles.captureButton}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
  
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: 8,
  },
  
  subtitle: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 32,
    gap: 16,
  },
  
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  
  statLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  
  statValue: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  
  receiptsSection: {
    flex: 1,
    marginBottom: 32,
  },
  
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
  },
  
  exportText: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: typography.fontWeight.medium,
  },
  
  receiptsList: {
    flex: 1,
  },
  
  receiptCard: {
    marginBottom: 12,
  },
  
  selectedReceiptCard: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  
  receiptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  
  merchantName: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
    flex: 1,
  },
  
  receiptAmount: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  
  receiptDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  
  receiptDate: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  
  receiptCategory: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    backgroundColor: colors.gray[100],
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  
  receiptActions: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  
  actionButton: {
    flex: 1,
  },
  
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  
  emptyStateTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
    marginBottom: 8,
  },
  
  emptyStateText: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  
  actions: {
    marginBottom: 20,
  },
  
  captureButton: {
    marginBottom: 16,
  },
});
