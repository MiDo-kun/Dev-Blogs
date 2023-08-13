const UserProfile = () => {
  return (
    <div className="flex items-center">
      <p className="inline-flex items-center mr-3 text-sm text-white ">
        <img
          className="mr-2 w-6 h-6 rounded-full"
          src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
          alt="Michael Gough" />Michael Gough</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        <time>Feb. 8, 2022</time>
      </p>
    </div>
  )
}

export default UserProfile;