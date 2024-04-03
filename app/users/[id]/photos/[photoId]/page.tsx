import React from "react";

interface Props {
  params: { id: number; photoId: number };
}

const UserPhoto = ({ params: { id, photoId } }: Props) => {
  return (
    <div>
      UserPhoto {id} Photo:
      {photoId}
    </div>
  );
};

export default UserPhoto;
