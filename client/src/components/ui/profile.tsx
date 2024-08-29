function Profile({ src }: { src: string }) {
  return (
    <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
      <img src={src} alt="Profile" className="h-[100%] w-[100%] object-cover" />
    </div>
  );
}

export default Profile;
