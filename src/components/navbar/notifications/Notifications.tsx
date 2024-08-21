import AutorenewIcon from "@mui/icons-material/Autorenew";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InfoIcon from "@mui/icons-material/Info";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PaidIcon from "@mui/icons-material/Paid";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { getMessaging, onMessage } from "firebase/messaging";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { INotification } from "../../../interfaces/notifications/notifications";
import firebaseApp from "../../../tools/firebase";
import { myFetch } from "../../../tools/myFetch";

export default function Notifications() {
  const router = useRouter();
  const notificationListLimit = 99;
  const notificationListPage = 1;
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [nbrNewNotifications, setNbrNewNotifications] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const messaging = getMessaging(firebaseApp);
      onMessage(messaging, (payload) => {
        // Handle the received push notification while the app is in the foreground
        // You can display a notification or update the UI based on the payload
        fetchNotifications();
        fetchUnreadNotificationCount();
      });
    }
  }, []);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  async function fetchNotifications() {
    const response = await myFetch({
      route: `/api/notifications?limit=${notificationListLimit}&page=${notificationListPage}`,
      method: "GET",
    });
    if (response.ok) {
      const notifs = response.json as INotification[];
      setNotifications(notifs);
    }
  }
  async function fetchUnreadNotificationCount() {
    const response = await myFetch({ route: `/api/notifications/count`, method: "GET" });
    if (response.ok) {
      setNbrNewNotifications(response.json.unreadCount);
    }
  }

  async function onMarkAsRead(notificationId: string) {
    if (notifications.find((notification) => notification.id === notificationId)?.read) return;
    const response = await myFetch({ route: `/api/notifications/${notificationId}/read`, method: "PUT" });
    if (response.ok) {
      const notifReaded = response.json.notification as INotification;
      setNotifications(
        notifications.map((notification) => (notification.id === notifReaded.id ? notifReaded : notification))
      );
      setNbrNewNotifications(nbrNewNotifications - 1);
    }
  }

  useEffect(() => {
    fetchNotifications();
    fetchUnreadNotificationCount();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && event.target && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [containerRef]);

  function notificationIcon(type: string) {
    switch (type) {
      case "like":
        return <FavoriteIcon className="w-8 fill-primary" />;
      case "comment":
        return <CommentIcon className="w-8 blue-color" />;
      case "follow":
        return <PersonAddIcon className="w-8 green-color" />;
      case "payment_success":
        return <PaidIcon className="w-8 green-color" />;
      case "order_processing":
        return <AutorenewIcon className="w-8 blue-color" />;
      case "order_cancelled_seller" || "order_cancelled_buyer":
        return <CancelIcon className="w-8 fill-primary" />;
      case "order_completed":
        return <CheckCircleIcon className="w-8 green-color" />;
      case "order_shipping":
        return <LocalShippingIcon className="w-8 blue-color" />;
      default:
        return <InfoIcon className="w-8 gray-color" />;
    }
  }

  function notificationContent(type: string, content: string) {
    switch (type) {
      case "like":
        return `${content} a aimé votre publication`;
      case "comment":
        return "Nouveau commentaire sur une de vos publications";
      case "follow":
        return `${content} vous suit`;
      case "payment_success":
        return "Une personne viens d'acheter une de vos oeuvres !";
      case "order_processing":
        return "Votre payment a bien été reçu, le vendeur va traiter votre commande";
      case "order_cancelled_seller":
        return "Une de vos commandes a été annulée";
      case "order_cancelled_buyer":
        return "Vous avez annulé une commande";
      case "order_completed":
        return "Une de vos commandes a été complétée";
      case "order_shipping":
        return "Votre commande est en cours de livraison";
      default:
        return content;
    }
  }

  function onGoToNotificationContent(type: string, referenceId: string) {
    if (type === "like" || type === "comment") {
      router.push(`/single/${referenceId}`);
    } else if (type === "follow") {
      router.push(`/profile/${referenceId}`);
    } else if (type === "payment_success" || type === "order_cancelled_seller" || type === "order_completed") {
      router.push(`/order?type=sell&orderId=${referenceId}`);
    } else if (type === "order_processing" || type === "order_cancelled_buyer" || type === "order_shipping") {
      router.push(`/order?type=buy&orderId=${referenceId}`);
    }
  }

  return (
    <div className="cursor-pointer relative" ref={containerRef}>
      <div onClick={toggleDropdown}>
        <NotificationsIcon />
        {nbrNewNotifications !== 0 && (
          <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-3 -end-3">
            {nbrNewNotifications}
          </div>
        )}
      </div>
      {isOpen && (
        <div className="absolute justify-between right-0 mt-2 w-96 max-h-56 bg-white border border-b border-b-secondaryGrey shadow-lg rounded-lg p-4 z-50 cursor-default overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex flex-row justify-stretch items-center gap-2 py-2 px-4 hover:bg-gray-100 rounded-md cursor-pointer"
                onMouseEnter={() => onMarkAsRead(notification.id)}
                onClick={() => onGoToNotificationContent(notification.type, notification.referenceId)}
              >
                <div className="flex flex-row items-center gap-2">
                  <div className="place-self-start pt-1">{notificationIcon(notification.type)}</div>
                  <div className="flex flex-col">
                    <span className="text-md">{notificationContent(notification.type, notification.content)}</span>
                    <span className="text-sm italic">
                      {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true, locale: fr })}
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0 ml-auto">
                  {notification.read ? null : <div className="w-[10px] h-[10px] bg-red-500 rounded-full"></div>}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">
              <span className="italic text-md">Aucune notification</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
