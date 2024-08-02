export interface INotification {
  id: string;
  recipient: string;
  type: string;
  content: string;
  referenceId: string;
  read: boolean;
  createdAt: string;
}
