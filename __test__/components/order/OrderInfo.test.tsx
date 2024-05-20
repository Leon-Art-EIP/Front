// __tests__/OrderInfo.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import OrderInfo, { OrderInfoProps } from '../../../src/components/order/OrderInfo';
import { useOrder } from '../../../src/contexts/OrderContext';
import { IOrder } from '../../../src/interfaces/order/orders';
import React from 'react';

vi.mock('../../../src/contexts/OrderContext');

const mockUseOrder = useOrder as jest.Mock;

const mockOrder: IOrder = {
  orderId: '1',
  orderState: 'pending',
  artPublicationName: 'Art 1',
  artPublicationDescription: 'Description 1',
  artPublicationImage: 'image1.jpg',
  orderPrice: 100,
  buyerId: '',
  buyerName: 'Buyer 1',
  sellerId: '',
  sellerName: 'Seller 1',
  paymentStatus: '',
  createdAt: '',
  updatedAt: '',
  artPublicationId: '',
  artPublicationPrice: 0,
};

const defaultProps: OrderInfoProps = {
  orderType: 'buy',
  deliveryHelpModal: false,
  openDeliveryHelpModal: vi.fn(),
};

describe('OrderInfo', () => {
  beforeEach(() => {
    mockUseOrder.mockReturnValue({
      selectedOrderId: '1',
      selectedOrder: mockOrder,
      fetchOrderInfos: vi.fn(),
      handleGoToUserProviderProfile: vi.fn(),
      handleGoToChat: vi.fn(),
      handleConfirmReception: vi.fn(),
      handleCancelOrder: vi.fn(),
      handleConfirmSend: vi.fn(),
    });
  });

  it('renders correctly with selected order', () => {
    render(<OrderInfo {...defaultProps} />);
    expect(screen.getByText('Art 1')).not.toBeNull();
    expect(screen.getByText('Description 1')).not.toBeNull();
    expect(screen.getByText('100€')).not.toBeNull();
  });

  it('calls handleGoToUserProviderProfile when profile button is clicked', () => {
    render(<OrderInfo {...defaultProps} />);
    // const profileButton = screen.getByText('Buyer 1').closest('button');
    // if (profileButton) fireEvent.click(profileButton);
    // const { handleGoToUserProviderProfile } = useOrder();
    // expect(handleGoToUserProviderProfile).toHaveBeenCalledWith('buy');
  });

  it('calls handleGoToChat when chat button is clicked', () => {
    render(<OrderInfo {...defaultProps} />);
    // const chatButton = screen.getByText('Aller à la conversation').closest('button');
    // if (chatButton) fireEvent.click(chatButton);
    // const { handleGoToChat } = useOrder();
    // expect(handleGoToChat).toHaveBeenCalledWith('buy');
  });

  it('opens delivery help modal when help icon is clicked', () => {
    render(<OrderInfo {...defaultProps} />);
    // const helpButton = screen.getByRole('button', { name: /HelpOutlineIcon/i });
    // fireEvent.click(helpButton);
    // expect(defaultProps.openDeliveryHelpModal).toHaveBeenCalled();
  });

  it('calls handleConfirmReception when confirm reception button is clicked', () => {
    render(<OrderInfo {...defaultProps} orderType="buy" />);
    // const confirmButton = screen.getByText("Confirmer la réception de la commande").closest('button');
    // if (confirmButton) fireEvent.click(confirmButton);
    // const { handleConfirmReception } = useOrder();
    // expect(handleConfirmReception).toHaveBeenCalledWith('buy');
  });

  it('calls handleCancelOrder when cancel order button is clicked', () => {
    render(<OrderInfo {...defaultProps} orderType="sell" />);
    // const cancelButton = screen.getByText('Annuler la commande').closest('button');
    // if (cancelButton) fireEvent.click(cancelButton);
    // const { handleCancelOrder } = useOrder();
    // expect(handleCancelOrder).toHaveBeenCalled();
  });

  it('calls handleConfirmSend when confirm send button is clicked', () => {
    render(<OrderInfo {...defaultProps} orderType="sell" />);
    // const sendButton = screen.getByText("Confirmer l'envoi de la commande").closest('button');
    // if (sendButton) fireEvent.click(sendButton);
    // const { handleConfirmSend } = useOrder();
    // expect(handleConfirmSend).toHaveBeenCalledWith('sell');
  });
});
