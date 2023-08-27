const UserProfile = ({ name, photo, updatedAt}) => {
  const commentPosted = new Date(updatedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  return (
    <div className="flex items-center">
      <p className="inline-flex items-center mr-3 text-sm text-white ">
        <img
          className="mr-2 w-6 h-6 rounded-full"
          src={photo}
          alt={name} />
        {name}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        <time>{commentPosted}</time>
      </p>
    </div>
  )
}

export default UserProfile;