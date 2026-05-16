const MediaPreview = ({ mediaUrl, mediaType, className = "" }) => {
  if (!mediaUrl) return <div className={`bg-gray-800 flex items-center justify-center text-gray-500 ${className}`}>No Media</div>;

  if (mediaType === 'video') {
    return (
      <video 
        src={mediaUrl} 
        controls 
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <img 
      src={mediaUrl} 
      alt="Evidence" 
      className={`object-cover ${className}`}
    />
  );
};

export default MediaPreview;
