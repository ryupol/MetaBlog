function Profile({ src, className }: { src: string; className?: string }) {
  return (
    <div className={`flex-shrink-0 overflow-hidden rounded-full ${className}`}>
      <img src={src} alt="Profile" className="h-[100%] w-[100%] object-cover" />
    </div>
  );
}

export default Profile;
