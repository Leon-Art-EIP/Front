export interface IMapUser {
  _id: string;
  username: string;
  profilePicture: string;
}

export interface ILocatedMapUser extends IMapUser {
  position: google.maps.LatLngLiteral;
}
