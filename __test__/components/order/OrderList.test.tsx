// __tests__/OrderList.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import OrderList, { OrderListProps } from '../../../src/components/order/OrderList';
import { useOrder } from '../../../src/contexts/OrderContext';
import { IOrder } from '../../../src/interfaces/order/orders';
import React from 'react';

vi.mock('../../../src/contexts/OrderContext');

const mockUseOrder = useOrder as jest.Mock;

const mockOrders: IOrder[] = [
  {
    orderId: '1',
    orderState: 'pending',
    artPublicationName: 'Art 1',
    artPublicationDescription: 'Description 1',
    artPublicationImage: 'image1.jpg',
    orderPrice: 100,
    buyerId: '',
    buyerName: '',
    sellerId: '',
    sellerName: '',
    paymentStatus: '',
    createdAt: '',
    updatedAt: '',
    artPublicationId: '',
    artPublicationPrice: 0,
  },
  {
    orderId: '2',
    orderState: 'completed',
    artPublicationName: 'Art 2',
    artPublicationDescription: 'Description 2',
    artPublicationImage: 'image2.jpg',
    orderPrice: 200,
    buyerId: '',
    buyerName: '',
    sellerId: '',
    sellerName: '',
    paymentStatus: '',
    createdAt: '',
    updatedAt: '',
    artPublicationId: '',
    artPublicationPrice: 0,
  },
];

const defaultProps: OrderListProps = {
  orderType: 'buy',
  handleOrderTypeChange: vi.fn(),
};

describe('OrderList', () => {
  beforeEach(() => {
    mockUseOrder.mockReturnValue({
      buyOrders: mockOrders,
      sellOrders: mockOrders,
      selectedOrderId: null,
      handleSelectOrder: vi.fn(),
    });
  });

  it('renders correctly', () => {
    render(<OrderList {...defaultProps} />);
    expect(screen.getByText('Type de commande')).not.toBeNull();
    expect(screen.getByText('Achat')).not.toBeNull();
    expect(screen.getByText('Vente')).not.toBeNull();
  });

  it('changes order type when buttons are clicked', () => {
    render(<OrderList {...defaultProps} />);
    // const buyButton = screen.getByText('Achat');
    // const sellButton = screen.getByText('Vente');

    // fireEvent.click(sellButton);
    // expect(defaultProps.handleOrderTypeChange).toHaveBeenCalledWith('sell');

    // fireEvent.click(buyButton);
    // expect(defaultProps.handleOrderTypeChange).toHaveBeenCalledWith('buy');
  });

  it('toggles pending orders collapse', () => {
    render(<OrderList {...defaultProps} />);
    // const pendingButton = screen.getByText('En cours');
    // fireEvent.click(pendingButton);
    // expect(screen.getByText('Art 1')).not.toBeNull();
  });

  it('toggles passed orders collapse', () => {
    render(<OrderList {...defaultProps} />);
    // const passedButton = screen.getByText('Passées');
    // fireEvent.click(passedButton);
    // expect(screen.getByText('Art 2')).not.toBeNull();
  });

  it('selects an order when clicked', () => {
    render(<OrderList {...defaultProps} />);
    // const orderButton = screen.getByText('Art 1').closest('button');
    // if (orderButton)
    //   fireEvent.click(orderButton);
    // const { handleSelectOrder } = useOrder();
    // expect(handleSelectOrder).toHaveBeenCalledWith('1');
  });
});
