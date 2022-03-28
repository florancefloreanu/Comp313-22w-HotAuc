import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { SERVER_URL } from "../../ConstantValue"

export const login = createAsyncThunk(
	"users/login",
	async (loginUserState, thunkAPI) => {
		try {
			const response = await axios.post(
				`${SERVER_URL}auth/login`,
				loginUserState,
				{
					headers: {
						"Content-Type": "Application/json"
					}
				}
			)

			if (response.status !== 200) {
				return thunkAPI.rejectWithValue(response)
			}
			localStorage.setItem("email", response.data.user.email)
			localStorage.setItem("token", response.data.token)
			localStorage.setItem("name", response.data.user.name)
			localStorage.setItem("_id", response.data.user._id)
			return response
		} catch (err) {
			console.log(err)
		}
	}
)

export const register = createAsyncThunk(
	"users/register",
	async (RegistUserState, thunkAPI) => {
		const response = await axios
			.post(`${SERVER_URL}auth/register`, RegistUserState, {
				headers: {
					"Content-Type": "Application/json"
				}
			})
			.catch((error) => {
				return error.response
			})

		if (response.status !== 200) {
			return thunkAPI.rejectWithValue(response)
		}
			localStorage.setItem("email", response.data.user.email)
			localStorage.setItem("token", response.data.token)
			localStorage.setItem("name", response.data.user.name)
			localStorage.setItem("_id", response.data.user._id)

		return response
	}
)
const initialState = {
	user: {},
	token: "",
	loading: false,
	errors: []
}

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUserInfo: (state, action) => {
			state.user = action.payload
		},
		setlocalUser: (state, action) => {
			console.log(action.payload)
			state.user = action.payload.user
			state.token = action.payload.token
			state.loading = false
			state.errors = initialState.errors
		},
		setLogout: (state, action) => {
			state.user = null
			state.token = null
			state.loading = false
			state.errors = initialState.errors

			localStorage.clear()
		}
	},
	extraReducers: (builder) => (
		// Add reducers for additional action types here, and handle loading state as needed
		builder.addCase(register.fulfilled, (state, action) => {
			// Add user to the state array
			state.user = action.payload.data.user
			state.token = action.payload.data.token
			state.loading = false
			state.errors = initialState.errors
		}),
		builder.addCase(register.rejected, (state, action) => {
			// Add user to the state array
			state.errors = action.payload.data.errors
			state.loading = false
		}),
		builder.addCase(register.pending, (state) => {
			// Add user to the state array
			state.loading = true
		}),
		builder.addCase(login.fulfilled, (state, action) => {
			state.user = action.payload.data.user
			state.token = action.payload.data.token
			state.loading = false
			state.errors = initialState.errors
		}),
		builder.addCase(login.pending, (state) => {
			state.loading = true
		}),
		builder.addCase(login.rejected, (state, action) => {
			// Add user to the state array
			state.errors = action.payload.data.errors
			state.loading = false
		})
	)
})

export const { setUserInfo, setlocalUser, setLogout } = userSlice.actions
export const userReducer = userSlice.reducer
